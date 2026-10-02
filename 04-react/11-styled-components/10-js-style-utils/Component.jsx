import {
  Card,
  CardTitle,
  StatusText,
} from "./styled-css";

function Component({
  isError,
  isSuccess,
}) {
  const statusMessage = isError
    ? "System Error"
    : isSuccess
    ? "System Healthy"
    : "System Idle";

  return (
    <Card>
      <CardTitle>System Status</CardTitle>

      <StatusText
        isError={isError}
        isSuccess={isSuccess}
      >
        {statusMessage}
      </StatusText>
    </Card>
  );
}

export default Component;