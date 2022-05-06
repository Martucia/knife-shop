import Alert from '@mui/material/Alert';

const AlertComponent = (props) => {
    setTimeout(function () {
        if(props.close) props.close(false);
    }, 4000);

    return (
        <div className="alert" style={{ display: props.visible }}>
            <Alert severity="warning">Войдите в акаунт</Alert>
        </div>
    );
}

export default AlertComponent;