// adapted from https://slider-react-component.vercel.app/demo/handle

import { ReactElement, ReactNode, useEffect, useRef } from "react"
import Slider from "rc-slider"
import Tooltip from "rc-tooltip"
import raf from "rc-util/lib/raf"

import type { SliderProps } from "rc-slider"

import "rc-tooltip/assets/bootstrap.css"

interface HandleTooltipProps {
    value: number
    children: ReactElement
    visible: boolean
    tipFormatter?: (value: number) => ReactNode
}

const HandleTooltip = (props: HandleTooltipProps) => {
    const {
        value,
        children,
        visible,
        tipFormatter = val => `${val}`,
        ...restProps
    } = props

    const tooltipRef = useRef<any>()
    const rafRef = useRef<number | null>(null)

    function cancelKeepAlign() {
        raf.cancel(rafRef.current!)
    }

    function keepAlign() {
        rafRef.current = raf(() => { // changed from forcePopupAlign()
            tooltipRef.current?.forceAlign()
        })
    }

    useEffect(() => {
        if (visible) {
            keepAlign()
        } else {
            cancelKeepAlign()
        }

        return cancelKeepAlign
    }, [value, visible])

    const style = {
        minHeight: "auto",
        boxShadow: "none",
        padding: 0,
        color: "#000",
        backgroundColor: "unset",
        borderRadius: 0,
    }

    return (
        <Tooltip
            placement="bottom"
            overlay={tipFormatter(value)}
            showArrow={false}
            overlayInnerStyle={style}
            ref={tooltipRef}
            visible={visible}
            {...restProps}
        >
            {children}
        </Tooltip>
    )
}

export const TooltipSlider = ({
    tipFormatter,
    tipProps,
    ...props
}: SliderProps & {
    tipFormatter?: (value: number) => ReactNode
    tipProps: any
}) => {
    const tipHandleRender: SliderProps["handleRender"] = (
        node,
        handleProps
    ) => (
        <HandleTooltip
            value={handleProps.value}
            visible={handleProps.dragging}
            tipFormatter={tipFormatter}
            {...tipProps}
        >
            {node}
        </HandleTooltip>
    )

    return <Slider {...props} handleRender={tipHandleRender} />
}
