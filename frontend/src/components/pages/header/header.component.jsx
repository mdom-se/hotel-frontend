import { FormGroup } from "reactstrap";
import './header-page.css'

export const Header = () => {

    return (
        <FormGroup row > 
            <div className="header-page" >
                <h1 className="header-title">
                    Hotels
                </h1>
            </div>
        </FormGroup>
    );
}

export default Header;