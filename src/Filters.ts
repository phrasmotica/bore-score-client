interface Filter<T> {
    condition: boolean
    func: (e: T) => boolean
}

export class FilterSet<T> {
    constructor(private filters: Filter<T>[]) { }

    /**
     * Applies the filters in this FilterSet to the given elements and returns
     * the elements that passed the filters.
     * @param elements the elements to filter
     */
    apply(elements: T[]) {
        let filteredElements = [...elements]

        for (let f of this.filters) {
            // condition must be true for func to be applied
            filteredElements = filteredElements.filter(r => !f.condition || f.func(r))
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

        for (let f of this.filters) {
            filteredElements = filteredElements.filter(f.func)
        }

        return filteredElements
    }

    /**
     * Returns a new FilterSet with all filters except the one with the given index
     * from this FilterSet.
     * @param index the index of the filter to exclude
     */
    except(index: number) {
        if (index < 0 || index >= this.filters.length) {
            throw new Error(`Index ${index} is out of range`)
        }

        return new FilterSet(this.filters.filter((f, i) => i !== index))
    }

    /**
     * Returns a new FilterSet with only the filter with the given index
     * from this FilterSet.
     * @param index the index of the filter to include
     */
    only(index: number) {
        if (index < 0 || index >= this.filters.length) {
            throw new Error(`Index ${index} is out of range`)
        }

        return new FilterSet([this.filters[index]])
    }
}
