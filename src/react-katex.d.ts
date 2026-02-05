declare module 'react-katex' {
    import * as React from 'react';

    interface MathProps {
        math: string;
        block?: boolean;
    }

    export const InlineMath: React.FC<MathProps>;
    export const BlockMath: React.FC<MathProps>;
}