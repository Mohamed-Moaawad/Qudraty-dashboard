import './EquationsTable.css';
import { useState } from "react";
// import { BlockMath } from "react-katex";
import CustomButton from "../ui/buttons/CustomButton";
import CustomTextarea from '../ui/inputs/CustomTextarea';

type TEquationsTable = {
    setIsImage: React.Dispatch<React.SetStateAction<string>>;
}

const EquationsTable = ({ setIsImage }: TEquationsTable) => {

    const equations = [
        // المعادلات الموجودة في الصورة
        { id: 1, label: "كسر بسيط", latex: "\\frac{1}{2}", category: "أساسي" },
        { id: 2, label: "جذر تربيعي", latex: "\\sqrt{x}", category: "أساسي" },
        { id: 3, label: "جذر تكعيبي", latex: "\\sqrt[3]{x}", category: "أساسي" },
        { id: 4, label: "معادلة تربيعية", latex: "ax^2 + bx + c = 0", category: "جبر" },
        { id: 5, label: "فيثاغورس", latex: "a^2 + b^2 = c^2", category: "هندسة" },
        { id: 6, label: "مجموع (Σ)", latex: "\\sum_{i=1}^{n} x_i", category: "إحصاء" },
        { id: 7, label: "تكامل", latex: "\\int f(x) \\, dx", category: "تفاضل" },
        { id: 8, label: "نهاية (lim)", latex: "\\lim_{x \\to \\infty} f(x)", category: "تفاضل" },
        { id: 9, label: "القانون العام", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", category: "جبر" },
        { id: 10, label: "مساحة الدائرة", latex: "A = \\pi r^2", category: "هندسة" },
        { id: 11, label: "محيط الدائرة", latex: "C = 2\\pi r", category: "هندسة" },
        { id: 12, label: "مساحة المثلث", latex: "A = \\frac{1}{2} b h", category: "هندسة" },
        { id: 13, label: "مربع مجموع", latex: "(a + b)^2 = a^2 + 2ab + b^2", category: "جبر" },
        { id: 14, label: "فرق بين مربعين", latex: "a^2 - b^2 = (a - b)(a + b)", category: "جبر" },
        { id: 15, label: "معدل التغير", latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}", category: "جبر" },
        { id: 16, label: "معادلة خطية", latex: "y = mx + b", category: "جبر" },

        // إضافات شائعة للمشاريع التعليمية
        { id: 17, label: "قانون الجيب", latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B}", category: "مثلثات" },
        { id: 18, label: "المتطابقة الشهيرة", latex: "\\sin^2 \\theta + \\cos^2 \\theta = 1", category: "مثلثات" },
        { id: 19, label: "اللوغاريتم", latex: "\\log_b(x) = y", category: "جبر" },
        { id: 20, label: "المتوسط الحسابي", latex: "\\bar{x} = \\frac{\\sum x}{n}", category: "إحصاء" }
    ];

    const [selected, setSelected] = useState<string | null>(null);
    const [editable, setEditable] = useState("");

    const handleSelect = (latex: string) => {
        setSelected(latex);
        setEditable(latex); // هذا النص سيصبح قابل للتعديل
    };

    const sendToApi = async () => {
        if (!selected) return;
        // const payload = { equation: selected };
        console.log(selected);
        setIsImage(`https://mathpad.ai/api/v1/latex2image?latex=${encodeURIComponent(editable)}&format=png&scale=3`)
    };


    return (
        <div className='equations-table'>
            <div>
                <div className="equation-table">
                    {equations.map((eq) => (
                        <div key={eq.id} className="box w-4/12 md:w-3/12 lg:w-3/12 p-1 mb-2">
                            <div className='equation p-1'
                                onClick={() => handleSelect(eq.latex)}
                            >
                                <span>
                                    {eq.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {selected && (
                    <div className='mt-5'>
                        <h4>المعادلة المختارة:</h4>

                        {/* Input لتعديل المعادلة */}
                        <CustomTextarea
                            label='تعديل المعادلة'
                            placeholder='تعديل المعادلة'
                            value={editable}
                            onChange={(e) => setEditable(e.target.value)}
                        />

                        {/* عرض BlockMath مباشرة */}
                        <div className='my-4'>
                            {/* <BlockMath math={editable} /> */}
                        </div>

                        {/* عرض الصورة من LaTeX مباشرة */}
                        <h4>المعادلة كصورة:</h4>
                        <div className="flex justify-center">
                            <img
                                src={`https://mathpad.ai/api/v1/latex2image?latex=${encodeURIComponent(editable)}&format=png&scale=3`}
                                alt="equation"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-5'>
                <CustomButton
                    type='button'
                    text='إضافة'
                    radius='md'
                    variant='filled'
                    onClick={sendToApi}
                />
            </div>
        </div>
    )
}

export default EquationsTable