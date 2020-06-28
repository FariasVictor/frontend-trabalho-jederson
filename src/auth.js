const isAuthenticated=(props) => (
    props.location.state?.userTypeEnum && props.location.state?.userId
);

export default isAuthenticated;