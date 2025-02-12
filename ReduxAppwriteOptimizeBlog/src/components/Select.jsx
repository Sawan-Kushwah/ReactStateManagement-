import PropTypes from 'prop-types'
import React, { useId } from 'react'

const Select = ({
    options = [],
    className = "",
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className='w-full'>
            <select className={`${className}`} id={id} ref={ref} {...props}>
                {options &&
                    options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>

        </div>
    )
}

export default React.forwardRef(Select)

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string
}