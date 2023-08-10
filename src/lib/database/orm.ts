import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export async function getFromUrls(key: string) {
	const client = new DynamoDBClient({ region: 'ap-northeast-2' })
	const command = new GetItemCommand({
		TableName: 'urls',
		Key: {
			key: { S: key },
		},
	})
	return client.send(command)
}

export function putToUrls(key: string, value: string) {
	const client = new DynamoDBClient({ region: 'ap-northeast-2' })
	const command = new PutItemCommand({
		TableName: 'urls',
		Item: {
			key: { S: key },
			value: { S: value },
		},
	})
	return client.send(command)
}

export async function putToImages(key: string, file: File) {
	const arrayBuffer = await file.arrayBuffer()
	const uint8ArrayData = new Uint8Array(arrayBuffer)

	const client = new S3Client({ region: 'ap-northeast-2' })
	const options = {
		Bucket: 'misalili-images',
		Key: key + '.' + file.type.split('/')[1],
		Body: uint8ArrayData,
		ContentType: file.type,
	}
	const command = new PutObjectCommand(options)
	return client.send(command)
}
