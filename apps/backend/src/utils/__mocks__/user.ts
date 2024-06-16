import { faker } from '@faker-js/faker'

export const getUserMock = () => {
	const username = faker.internet.userName()
	const userId = faker.string.uuid()
	const createdDate = faker.date.anytime()
	const bio = faker.lorem.lines(4)
	const avatarUrl = faker.helpers.maybe(() => faker.image.url()) || null
	const email = faker.internet.email()
	const name = faker.person.fullName()
	const password = faker.string.uuid()

	return {
		username: username,
		avatarUrl: avatarUrl,
		bio: bio,
		createdAt: createdDate,
		email: email,
		emailverified: null,
		name: name,
		password: password,
		userId: userId,
	}
}
