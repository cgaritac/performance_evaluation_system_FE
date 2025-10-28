import { Footer } from "~/shared"
import { FOOTER_TEXT } from "../constants";

const FooterComponent: React.FC = () => {
    return (
        <Footer>
            {FOOTER_TEXT.COMPANY_NAME}
        </Footer>
    )
};

export default FooterComponent;