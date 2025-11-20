import { LogoRefresh } from "~/features";
import { Button, Header, useHandleLogoutHook } from "~/shared";
import { HEADER_TEXT } from "../constants";
import { Logo } from "../lib";

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
                    imageClassName="h-12 w-auto object-contain my-1"
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