import Header from "../../components/header/Header"
import Container from "../../components/ui/Container"
import HeadTitle from "../../components/headTitle/HeadTitle"
// import SelectInput from "../../components/ui/selectInput/SelectInput"
import CustomButton from "../../components/ui/buttons/CustomButton"

import PlacementExam from "./PlacementExam"
import PracticeExam from "./PracticeExam"

import { Tabs } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Plus } from "lucide-react"
import FinalExam from "./FinalExam"
import { useState } from "react"

const Exams = () => {
    const [activeTab, setActiveTab] = useState<string | null>("final-exam");
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <section>
            {/* header */}
            <Header text="إدارة الامتحانات" />

            <Container>

                <Tabs value={activeTab} onChange={setActiveTab}
                    defaultValue="final-exam"
                >
                    <Tabs.List>
                        <Tabs.Tab value="final-exam">
                            امتحانات المنهج
                        </Tabs.Tab>
                        <Tabs.Tab value="placement-exam">
                            تحديد المستوى
                        </Tabs.Tab>
                        <Tabs.Tab value="training-exam">
                            التدريب
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="final-exam">
                        {activeTab === "final-exam" && (
                            <>
                                <HeadTitle title="الامتحانات النهائية"
                                    component={
                                        <CustomButton
                                            type="button"
                                            text="إضافة امتحان جديدة"
                                            variant="light"
                                            radius="xl"
                                            icon={<Plus />}
                                            onClick={open}
                                        />
                                    }
                                />
                                <FinalExam close={close} opened={opened} />
                            </>
                        )}
                    </Tabs.Panel>

                    <Tabs.Panel value="placement-exam">
                        {activeTab === "placement-exam" && (
                            <>
                                <HeadTitle title="أمتحان تحديد المستوى" />
                                <PlacementExam />
                            </>
                        )}
                    </Tabs.Panel>

                    <Tabs.Panel value="training-exam">
                        {activeTab === "training-exam" && (
                            <>
                                <HeadTitle title="التدريب" />
                                <PracticeExam />
                            </>
                        )}
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </section>
    );
};

export default Exams;