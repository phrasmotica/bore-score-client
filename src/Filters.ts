export class Filter<T> {
    constructor(
        private condition: boolean,
        private func: (elems: T[]) => T[]
    ) { }

    applies() {
        return this.condition
    }

    apply(elems: T[]) {
        return this.func(elems)
    }
}

export class Predicate<T> extends Filter<T> {
    constructor(
        condition: boolean,
        func: (e: T) => boolean
    ) {
        super(condition, elems => elems.filter(e => func(e)))
    }
}

export class FilterSet<T> {
    private filters: Map<string, Filter<T>>

    constructor(filters?: Map<string, Filter<T>>) {
        this.filters = filters ?? new Map<string, Filter<T>>()
    }

    with(name: string, f: Filter<T>) {
        this.filters.set(name, f)
        return this
    }

    /**
     * Applies the filters in this FilterSet to the given elements and returns
     * the elements that passed the filters.
     * @param elements the elements to filter
     */
    apply(elements: T[]) {
        let filteredElements = [...elements]

        for (let f of this.filters.values()) {
            if (f.applies()) {
                filteredElements = f.apply(filteredElements)
            }
        }

        return filteredElements
    }

    /**
     * Applies the filters in this FilterSet to the given elements, regardless
     * of whether its condition is met, and returns the elements that passed the filters.
     * @param elements the elements to filter
     */
    forceApply(elements: T[], filterUp?: boolean) {
        if (this.filters.size <= 0) {
            // depends whether we are filtering "up" from an empty set
            // or "down" from a populated set
            return filterUp ? [] : elements
        }

        let filteredElements = [...elements]

        for (let f of this.filters.values()) {
            filteredElements = f.apply(filteredElements)
        }

        return filteredElements
    }

    /**
     * Returns a new FilterSet with all filters except the one with the given index
     * from this FilterSet.
     * @param index the index of the filter to exclude
     */
    except(name: string) {
        if (!this.filters.has(name)) {
            throw new Error(`Filter ${name} does not exist`)
        }

        const newFilters = new Map<string, Filter<T>>(this.filters)
        newFilters.delete(name)

        return new FilterSet<T>(newFilters)
    }

    /**
     * Returns a new FilterSet with only the filter with the given index
     * from this FilterSet.
     * @param index the index of the filter to include
     */
    only(name: string) {
        if (!this.filters.has(name)) {
            throw new Error(`Filter ${name} does not exist`)
        }

        return new FilterSet<T>().with(name, this.filters.get(name)!)
    }
}
