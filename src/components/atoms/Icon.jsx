import ApperIcon from '../ApperIcon'; // Assuming ApperIcon is a utility component

const Icon = ({ name, className = '' }) => {
  return <ApperIcon name={name} className={className} />;
};

export default Icon;