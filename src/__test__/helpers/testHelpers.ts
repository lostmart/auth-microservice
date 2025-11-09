// src/__test__/helpers/testHelpers.ts
export const log = {
	response: (response: any, label?: string) => {
		console.log(label ? `\n📋 ${label}` : "\n📋 Response:")
		console.log("Status:", response.status)
		console.log("Body:", JSON.stringify(response.body, null, 2))
		console.log("---")
		return response // Return for chaining
	},
}
