import { Header, Button, useHandleLogoutHook } from "~/shared";
import { LogoRefresh } from "~/features";
import { Logo } from "../lib";
import { HEADER_TEXT } from "../constants";

const HeaderComponent: React.FC = () => {
    const { handleLogout } = useHandleLogoutHook();

    const handleClick = () => {
        handleLogout();
    }

    return (
        <Header 
            leftChildren={
                <LogoRefresh 
                    imageRoute={Logo}
                    imageAlt={HEADER_TEXT.IMAGE_ALT}
                    imageClassName="my-1"
                />
            } 
            rightChildren={
                <Button onClick={handleClick}>
                    {HEADER_TEXT.LOGOUT_TEXT}
                </Button>
            }
        >
        </Header>
    )
}

export default HeaderComponent;