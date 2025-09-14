import { useState, useEffect } from 'react'
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from '@aws-sdk/client-cognito-identity'
import { SignatureV4 } from '@aws-sdk/signature-v4'
import { Sha256 } from '@aws-crypto/sha256-browser'

// Types
interface AWSCredentials {
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
  identityId: string
}

interface AuthState {
  credentials: AWSCredentials | null
  loading: boolean
  error: string | null
}

interface FactsApiState {
  data: any
  loading: boolean
  error: string | null
}

// AWS Configuration
const AWS_CONFIG = {
  region: 'us-east-1',
  identityPoolId: 'us-east-1:2e47788f-4c4a-4133-b6eb-792d7acc5dd4',
}

// Hook for AWS Cognito authentication
export function useAWSAuth(): AuthState {
  const [credentials, setCredentials] = useState<AWSCredentials | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true)
        setError(null)

        // Create Cognito Identity client
        const cognitoClient = new CognitoIdentityClient({
          region: AWS_CONFIG.region,
        })

        // Get identity ID for guest access
        const getIdCommand = new GetIdCommand({
          IdentityPoolId: AWS_CONFIG.identityPoolId,
        })
        
        const identityResponse = await cognitoClient.send(getIdCommand)
        const identityId = identityResponse.IdentityId

        if (!identityId) {
          throw new Error('Failed to get identity ID')
        }

        // Get credentials for the identity
        const getCredentialsCommand = new GetCredentialsForIdentityCommand({
          IdentityId: identityId,
        })
        
        const credentialsResponse = await cognitoClient.send(getCredentialsCommand)
        const credentials = credentialsResponse.Credentials

        if (!credentials || !credentials.SessionToken) {
          throw new Error('Failed to get credentials')
        }

        // Store full credentials for signing requests
        setCredentials({
          accessKeyId: credentials.AccessKeyId!,
          secretAccessKey: credentials.SecretKey!,
          sessionToken: credentials.SessionToken,
          identityId: identityId
        })
        
      } catch (error) {
        console.error('AWS Auth failed:', error)
        setError(error instanceof Error ? error.message : 'Authentication failed')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  return { credentials, loading, error }
}

// API function for fetching facts
export async function fetchFact(credentials: AWSCredentials, specificId?: string): Promise<any> {
  const endpoint = 'https://api.dougsellers.dev/facts'
  // Use path parameter instead of query parameter
  const url = specificId ? `${endpoint}/${encodeURIComponent(specificId.trim())}` : endpoint
  
  // Create a signed request using AWS Signature V4
  const signer = new SignatureV4({
    credentials: credentials,
    region: AWS_CONFIG.region,
    service: 'execute-api',
    sha256: Sha256,
  })

  const request = {
    method: 'GET',
    hostname: 'api.dougsellers.dev',
    // Use path parameter instead of query parameter
    path: specificId ? `/facts/${encodeURIComponent(specificId.trim())}` : '/facts',
    protocol: 'https:',
    headers: {
      'Content-Type': 'application/json',
      'host': 'api.dougsellers.dev',
    },
  }

  const signedRequest = await signer.sign(request)
  
  const response = await fetch(url, {
    method: 'GET',
    headers: signedRequest.headers,
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
  }
  
  return await response.json()
}

// Hook for facts API calls
export function useFacts(): FactsApiState & { getFact: (specificId?: string) => Promise<void> } {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { credentials } = useAWSAuth()

  const getFact = async (specificId?: string) => {
    if (!credentials) {
      setError('Authentication required. Please wait for auth to complete.')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const result = await fetchFact(credentials, specificId)
      setData(result)
    } catch (err) {
      console.error('API call failed:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Error loading fun fact: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getFact }
}
