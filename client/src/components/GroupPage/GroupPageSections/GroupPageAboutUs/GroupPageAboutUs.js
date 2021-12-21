import GroupInformation from "./GroupInformation/GroupInformation";
import GroupTermsAndConditions from "./GroupTermsAndConditions/GroupTermsAndConditions";
import GroupDetails from "./GroupDetails/GroupDetails";

const GroupPageAboutUs = () => {
  return (
    <>
      <GroupInformation title={"About Us"}/>
      <GroupDetails/>
      <GroupTermsAndConditions />
    </>
  );
};

export default GroupPageAboutUs;
