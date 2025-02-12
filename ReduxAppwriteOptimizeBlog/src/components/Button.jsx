import PropTypes from "prop-types"

const Button = ({ children, type, bgColor = "bg-blue-700", textColor = "text-white", className = "", ...props }) => {
    return (
        <button
            className={`${bgColor} ${textColor} ${className} px-4 py-2 rounded-lg`}
            {...props}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button

Button.propTypes = {
    children: PropTypes.node.isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
}