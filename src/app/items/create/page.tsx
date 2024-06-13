import { auth } from "@/auth";
import CreateItemForm from "@/components/forms/CreateItemForm";
import AuthMessage from "@/components/ui/AuthMessage";

const CreateBidPage = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <AuthMessage message="you are unAuthorized!" />;
  }
  return <CreateItemForm />;
};

export default CreateBidPage;
