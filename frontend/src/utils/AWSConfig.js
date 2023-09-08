import AWS from 'aws-sdk';

// Configure the AWS SDK with your region (e.g., 'us-east-1')
AWS.config.update({ region: 'us-east-1' });

// Create a new AWS Secrets Manager client
const secretsManager = new AWS.SecretsManager();

// Name of the secret containing your API key
const secretName = 'openAiKey';

// Fetch the secret value
export const getOpenAiKey = secretsManager.getSecretValue({ SecretId: secretName }, (err, data) => {
  if (err) {
    console.error('Error fetching secret:', err);
  } else {
    const secretValue = JSON.parse(data.SecretString);
    const apiKey = secretValue.apiKey;
    // Use the API key in your React.js application
    console.log('API Key:', apiKey);
  }
});