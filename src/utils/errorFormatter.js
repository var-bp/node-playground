const errorFormatter = ({ location, msg, param }) => `${location}[${param}]: ${msg}`;

export default errorFormatter;
