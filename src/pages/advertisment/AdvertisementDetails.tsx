import { useParams } from "react-router-dom"
import Header from "../../components/header/Header";
import Container from "../../components/ui/Container";
import CustomInput from "../../components/ui/inputs/CustomInput";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import thunkGetSingleAdvertisement from "../../store/advertisement/thunk/thunkGetSingleAdvertisement";
import SkeletonForm from "../../components/skeleton/SkeletonForm";
import moment from "moment";
import CustomIconButton from "../../components/ui/buttons/CustomIconButton";
import { SquareArrowOutUpRight } from "lucide-react";
import CustomButton from "../../components/ui/buttons/CustomButton";
import toast from "react-hot-toast";
import thunkDeleteAdvertisement from "../../store/advertisement/thunk/thunkDeleteAdvertisement";
import CustomTextarea from "../../components/ui/inputs/CustomTextarea";

const AdvertisementDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { singleAdvertisement, loading } = useAppSelector((state) => state.advertisement);

    useEffect(() => {
        if (id) {
            dispatch(thunkGetSingleAdvertisement({ id }))
        }
    }, [dispatch, id]);

    // const navi


    const deleteAdvertisement = async () => {
        if (singleAdvertisement && id) {
            const loadToast = toast.loading('جاري حذف الأعلان');
            try {
                const data = {
                    id: singleAdvertisement.id,
                    title: singleAdvertisement.title,
                    description: singleAdvertisement.description,
                    imageUrl: singleAdvertisement.imageUrl,
                    authorUrl: singleAdvertisement.authorUrl,
                    order: singleAdvertisement.order,
                    isActive: singleAdvertisement.isActive ? false : true,
                }
                await dispatch(thunkDeleteAdvertisement({ data })).unwrap();
                dispatch(thunkGetSingleAdvertisement({ id }))
                toast.success('تم حذف الأعلان بنجاح');
            } catch (error) {
                toast.success(`حدث خطأ : ${error}`);
            } finally {
                toast.dismiss(loadToast);
            }
        }
    }

    return (
        <div className="advertisement-details">
            {/* header */}
            <Header text='الإعلانات' />
            <Container>
                {loading === 'pending' && (
                    <SkeletonForm />
                )}
                {singleAdvertisement && loading === 'succeeded' && (

                    <div className="w-full flex flex-wrap">
                        <div className="w-full p-4">
                            <CustomInput
                                type="text"
                                label="العنوان"
                                placeholder="العنوان"
                                value={singleAdvertisement.title}
                                readOnly
                            />
                        </div>
                        <div className="w-full  p-4">
                            <CustomTextarea
                                label="الوصف"
                                placeholder="الوصف"
                                value={singleAdvertisement.description}
                                readOnly
                            />
                        </div>
                        <div className="w-full sm:w-6/12 p-4">
                            <CustomInput
                                type="text"
                                label="تاريخ الإنشاء "
                                placeholder="تاريخ الإنشاء "
                                value={moment(singleAdvertisement.created).format('YYYY/MM/DD')}
                                readOnly
                            />
                        </div>
                        <div className="w-full sm:w-6/12 p-4">
                            <CustomInput
                                type="text"
                                label="تاريخ الإعلان"
                                placeholder="تاريخ الإعلان"
                                value={moment(singleAdvertisement.advertiseDate).format('YYYY/MM/DD')}
                                readOnly
                            />
                        </div>
                        <div className="w-full sm:w-6/12 flex p-4">
                            <div className="w-10/12">
                                <CustomInput
                                    type="text"
                                    label="رابط الاجتماع"
                                    placeholder="رابط الاجتماع"
                                    value={singleAdvertisement.authorUrl}
                                    readOnly
                                />
                            </div>
                            <div className="w-2/12 flex items-end justify-end">
                                <CustomIconButton
                                    icon={<SquareArrowOutUpRight />}
                                    color="var(--main-color)"
                                    radius={4}
                                    size="xl"
                                    onClick={() => {
                                        const url = singleAdvertisement.authorUrl.startsWith('http')
                                            ? singleAdvertisement.authorUrl
                                            : `https://${singleAdvertisement.authorUrl}`;
                                        window.open(url, '_blank');
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-6/12 p-4">
                            <CustomInput
                                type="text"
                                label="الحالة"
                                placeholder="الحالة"
                                value={singleAdvertisement.isActive ? 'نشط ✅' : 'غير نشط ❌'}
                                readOnly
                            />
                        </div>

                        <div className="forms-actions-btn w-full justify-end">
                            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12">
                                <CustomButton
                                    type="reset"
                                    text="حذف"
                                    radius="xl"
                                    variant="light"
                                    color="var(--danger-color)"
                                    onClick={deleteAdvertisement}
                                />
                            </div>
                            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12">
                                <CustomButton
                                    type="submit"
                                    text="إضافة"
                                    radius="xl"
                                    variant="filled"
                                // loading={loading === 'pending' ? true : false}
                                // disabled
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AdvertisementDetails