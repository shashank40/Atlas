
export const CenteredComponent = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      {children}
    </div>
  );
};

export default CenteredComponent;