const isAuthenticated=(props) => {
        return props.location.state?.userType && props.location.state?.userId
}

export default isAuthenticated;