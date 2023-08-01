import {
  HomeIcon
} from '@heroicons/react/24/outline'

export const navigation = [
  {
    name: 'Home', href: '/questions', icon: HomeIcon, current: true
  }
]

export type Navigation = typeof navigation

export const teams = [
  {
    id: 1, name: 'By tag', href: '#', initial: 'T', current: false
  },
  {
    id: 2, name: 'By location', href: '#', initial: 'L', current: false
  },
  {
    id: 3, name: 'Etc.', href: '#', initial: 'E', current: false
  }
]

export type Teams = typeof teams
