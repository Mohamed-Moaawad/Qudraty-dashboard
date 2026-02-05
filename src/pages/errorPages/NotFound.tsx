import './ErrorPages.css';
import Header from '../../components/header/Header';
import Container from '../../components/ui/Container';

const NotFound = () => {
    return (
        <section className='not-found'>
            {/* header */}
            <Header text=' الصفحة غير موجودة' />
            <Container>
                <div className="content">
                    <div className="img">
                        <img src="/image/image.png" alt="not found" />
                    </div>
                    <h3>لم يتم العثور على الصفحة</h3>
                    <p>لم نتمكن من العثور على الصفحة التي تبحث عنها</p>
                </div>
            </Container>
        </section>
    );
};

export default NotFound;