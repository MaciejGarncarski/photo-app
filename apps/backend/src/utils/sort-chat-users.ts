type MappedChatUser = {
	userId: string
	message: string | undefined | null
	messageCreatedAt: string | undefined | null
}

export const sortChatUsers = (a: MappedChatUser, b: MappedChatUser) => {
	if (a.messageCreatedAt && !b.messageCreatedAt) {
		return -1
	}

	if (!a.messageCreatedAt && b.messageCreatedAt) {
		return 1
	}

	if (!a.messageCreatedAt && !b.messageCreatedAt) {
		return -1
	}

	return new Date(a.messageCreatedAt || '').getTime() >
		new Date(b.messageCreatedAt || '').getTime()
		? -1
		: 1
}
