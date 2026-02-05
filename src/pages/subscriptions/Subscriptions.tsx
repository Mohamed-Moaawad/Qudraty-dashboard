import Header from "../../components/header/Header";
import Container from "../../components/ui/Container";
import HeadTitle from "../../components/headTitle/HeadTitle";
import SubscriptionsChart from "../../components/charts/SubscriptionsChart";
import SubscriptionCards from "../../components/subscriptionCards/SubscriptionCards";
import CustomButton from "../../components/ui/buttons/CustomButton";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import CustomModal from "../../components/ui/modals/CustomModal";
import AddNewSubscriptionPlanForm from "../../components/forms/AddNewSubscriptionPlanForm";


const Subscriptions = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <section>
            {/* header */}
            <Header text="الاشتراكات" />

            <Container>
                {/* head title */}
                <HeadTitle title="إيرادات الاشتراكات :"
                    component={
                        <ul className="head-title-component">
                            <li>هذا العام</li>
                            <li>العام الماضي</li>
                        </ul>
                    }
                />
                {/* Chart */}
                <div className="w-full my-5">
                    <SubscriptionsChart />
                </div>

                {/* Subscription plans */}
                <HeadTitle title="خطط الاشتراك :"
                    component={
                        <CustomButton
                            type="button"
                            text="إضافة خطة جديدة"
                            radius="lg"
                            variant="light"
                            rightIcon={<Plus />}
                            onClick={open}
                        />
                    }
                />
                <SubscriptionCards />
            </Container>
            <CustomModal opened={opened} onClose={close} title="إضافة خطة جديدة">
                <AddNewSubscriptionPlanForm close={close} />
            </CustomModal>
        </section>
    )
}

export default Subscriptions