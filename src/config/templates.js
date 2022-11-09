import { writable } from 'svelte/store'

import Timeline from '../components/templates/Timeline.svelte'; 

export const Templates = writable({
    "timeline": Timeline
})