import { atom, useAtom } from 'jotai'

const settingsAtom = atom(false)

export const useSettingsAtom = () => {
	const [isSettingsOpen, setSettingsOpen] = useAtom(settingsAtom)

	return { isSettingsOpen, setSettingsOpen }
}
