import { writable } from 'svelte/store'

export const Configuration = writable({
  runtimeEnv: process.env.NODE_ENV,
})