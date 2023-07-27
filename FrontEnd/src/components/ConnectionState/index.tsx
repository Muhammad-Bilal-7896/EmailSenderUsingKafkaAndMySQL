interface ConnectionStateProps {
  isConnected: boolean;
}

const ConnectionState = ({ isConnected }: ConnectionStateProps) => {
  return (
    <h3 style={{ color: isConnected ? "green" : "red" }}>
      State: {"" + isConnected}
    </h3>
  );
};
export default ConnectionState;
