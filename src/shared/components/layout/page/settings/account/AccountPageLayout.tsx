import MainHeader from "../../../header/MainHeader";
import AccountSideBar from "./AccountSideBar";
import AccountProfile from "./AccountProfile";
import AccountSupport from "../support/SupportSection";
import DevicesManagement from "../devices/DevicesManagement";
import AccountSecurity from "./AccountSecurity";

const AccountPageLayout = () => {
  return (
    <>
      <AccountProfile />
      <AccountSecurity />
    </>
  );
};

export default AccountPageLayout;
