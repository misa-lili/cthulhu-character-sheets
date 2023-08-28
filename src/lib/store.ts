import { writable } from 'svelte/store'
import { initialData } from './models/data'

export const sheet = writable<Sheet>(initialData)
export const isOwner = writable<boolean>(false)
