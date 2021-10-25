import { Advent } from '../advent'
import { input } from './input'

export class DayFour extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Four'
        this.Input = input

        const events = this.parseInput(this.Input)
        const guardSchedules = new Array<GuardSchedule>()
        let sleep: Event
        for (const event of events.filter((x) => x.eventType !== 'start')) {
            const guard = guardSchedules.find(
                (x) => x.guardId === event.guardId
            )
            if (!guard) {
                const newGuard = new GuardSchedule(event.guardId)
                guardSchedules.push(newGuard)
            }
            if (event.eventType === 'falls-asleep') {
                sleep = event
            } else if (event.eventType === 'wakes-up') {
                guard.AddSleepytime(sleep.GetMinute(), event.GetMinute())
            }
        }

        const sleepiestGuard = guardSchedules.reduce((sleepy, next) => {
            if (next.TotalSleepytimes() > sleepy.TotalSleepytimes()) {
                return next
            }
            return sleepy
        }, guardSchedules[0])

        this.PartA = (
            sleepiestGuard.guardId * sleepiestGuard.SleepiestMinute()
        ).toString()

        const sleepyMinute = guardSchedules.reduce((sleepy, next) => {
            if (
                next.SleepiestMinuteSleepytime() >
                sleepy.SleepiestMinuteSleepytime()
            ) {
                return next
            }
            return sleepy
        }, guardSchedules[0])

        this.PartB = (
            sleepyMinute.guardId * sleepyMinute.SleepiestMinute()
        ).toString()
    }

    private parseInput(input: string): Event[] {
        const events = input.split('\n').map((value) => new Event(value))
        events.sort((left, right) => +left.time - +right.time)
        let currentGuard: number
        for (const event of events) {
            if (event.eventType === 'start') {
                currentGuard = event.guardId
            } else {
                event.guardId = currentGuard
            }
        }
        return events
    }
}

class GuardSchedule {
    guardId: number
    minutesAsleep: number[] = Array(60).fill(0)
    constructor(id: number) {
        this.guardId = id
    }
    public AddSleepytime(start: number, end: number) {
        for (let i = start; i < end; i++) {
            this.minutesAsleep[i]++
        }
    }
    public TotalSleepytimes(): number {
        return this.minutesAsleep.reduce((acc, next) => acc + next)
    }
    public SleepiestMinute(): number {
        return this.minutesAsleep.findIndex(
            (x) => x === Math.max(...this.minutesAsleep)
        )
    }
    public SleepiestMinuteSleepytime(): number {
        return this.minutesAsleep[this.SleepiestMinute()]
    }
}

class Event {
    time: Date
    guardId: number
    eventType: EventType

    constructor(input: string) {
        const regex = /(?:\[(.*)\]).*(Guard(?: #(\d+))|falls|wakes)/
        const matches = input.split(regex).filter((x) => !!x)

        this.time = new Date(matches[0])

        const event = matches[1]
        if (event === 'falls') {
            this.eventType = 'falls-asleep'
        } else if (event === 'wakes') {
            this.eventType = 'wakes-up'
        } else {
            this.eventType = 'start'
        }

        if (matches[2]) {
            this.guardId = +matches[2]
        }
    }

    public GetMinute(): number {
        return this.time.getMinutes()
    }
}

type EventType = 'start' | 'falls-asleep' | 'wakes-up'
