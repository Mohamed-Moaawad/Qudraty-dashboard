import './SupportContacts.css';
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Container from "../../components/ui/Container";
import HeadTitle from "../../components/headTitle/HeadTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import thunGetSingleSupportContact from "../../store/supportContacts/thunk/thunGetSingleSupportContact";
import SkeletonList from "../../components/skeleton/SkeletonList";
import moment from "moment";
import { Avatar } from '@mantine/core';
import CustomTextarea from '../../components/ui/inputs/CustomTextarea';
import CustomButton from '../../components/ui/buttons/CustomButton';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { supportReplySchema, type supportReplySchemaType } from '../../validations/supportReplySchema';
import { zodResolver } from '@hookform/resolvers/zod';

const SupportContactDetails = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { singleSupportContacts, loading } = useAppSelector((state) => state.supportContacts);



    const { register, handleSubmit, reset, formState: { errors } } = useForm<supportReplySchemaType>({
        mode: 'onChange',
        resolver: zodResolver(supportReplySchema),
    });
    const [supportReply, setSupportReply] = useState<string>('');

    const onSubmit: SubmitHandler<supportReplySchemaType> = (data) => {
        console.log(data);
        setSupportReply(data.supportReply);
        reset();
    }



    useEffect(() => {
        if (id) {
            dispatch(thunGetSingleSupportContact({ id }));
        }
    }, [dispatch, id]);

    return (
        <section className="support-contacts">
            <Header text="الدعم الفنى " />
            <Container>
                <HeadTitle title="إدارة الدعم الفنى" />
                {loading === 'pending' && (
                    <SkeletonList />
                )}
                {singleSupportContacts && loading === 'succeeded' && (
                    <div>
                        <div className="w-full ticket">
                            <div className="flex justify-between items-center mb-4">
                                <h4> نوع المشكلة : <span>{singleSupportContacts.contactMethod}</span> </h4>
                                <span>{moment(singleSupportContacts.created).format('YYYY/MM/DD')}</span>
                            </div>
                            <h3>{singleSupportContacts.title}</h3>


                            <div className="ticket-footer flex justify-between items-center mt-8">
                                <div className="user flex items-center gap-2">
                                    <Avatar src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png" alt="user_image" />
                                    <p>{singleSupportContacts.createdBy}</p>
                                </div>
                                <p>{singleSupportContacts.isActive ? 'نشط ✅' : 'غير نشط ❌'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {supportReply && (
                    <div className="w-full ticket mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h4> رد فريق الدعم:</h4>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <p>
                            مرحبًا {singleSupportContacts?.createdBy} 👋، نشكرك على تواصلك معنا ونعتذر لك عن المشكلة اللي واجهتك 🙏.
                            <br />
                            الرد :
                            <br />
                            {supportReply}.
                            <br />
                            في حالة استمرار المشكلة، فريقنا التقني بالفعل على علم بها ويعمل على إصلاحها حاليًا.
                            سنقوم بالتواصل معك فور حل المشكلة أو يمكن تجربة التسجيل مرة أخرى خلال الساعات القادمة.
                            شكرًا لصبرك وتعاونك 🌹.
                        </p>
                    </div>
                )}

                <form className='mt-10'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CustomTextarea
                        label="رد الدعم الفني"
                        placeholder="رد الدعم الفني"
                        error={!!errors.supportReply}
                        errorText={errors.supportReply?.message}
                        {...register('supportReply')}
                    />
                    <div className='flex justify-end'>
                        <div className="w-full sm:w-6/12 md:w-4-12 lg:w-3/12 xl:w-2/12 mt-4">
                            <CustomButton
                                type='submit'
                                text='إرسال الرد'
                                radius='lg'
                                variant='filled'
                            />
                        </div>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default SupportContactDetails;