import PropTypes from "prop-types"
const Logo = ({ width = '100px' }) => {
    return (
        <div style={{ width: width }}>Logo</div>
    )
}

export default Logo

Logo.propTypes = {
    width: PropTypes.string
}