export class Filter<T> {
    constructor(
        private condition: boolean,
        private func: (e: T) => boolean
    ) { }

    applies() {
        return this.condition
    }

    apply(e: T) {
        return this.func(e)
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
            // condition must be true for func to be applied
            filteredElements = filteredElements.filter(r => !f.applies() || f.apply(r))
        }

        return filteredElements
    }

    /**
     * Applies the filters in this FilterSet to the given elements, regardless
     * of whether its condition is met, and returns the elements that passed the filters.
     * @param elements the elements to filter
     */
    forceApply(elements: T[]) {
        let filteredElements = [...elements]

        for (let f of this.filters.values()) {
            filteredElements = filteredElements.filter(e => f.apply(e))
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
