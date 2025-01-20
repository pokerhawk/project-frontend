import { ForwardRefRenderFunction, SelectHTMLAttributes, forwardRef } from 'react';
import * as S from './styles';

type TInputSelect = {
    name: string;
    defaultValue: string|number;
    optionsList: Array<string|number>;
}

type TSelectProps = TInputSelect & SelectHTMLAttributes<HTMLSelectElement>;

const InputSelect: ForwardRefRenderFunction<HTMLSelectElement, TSelectProps> = ({ name, defaultValue, optionsList, ...props }: TSelectProps, ref) => {
    return (
        <S.Wrapper>
            <S.Select
                name={name}
                defaultValue={defaultValue}
                ref={ref}
                {...props}
            >
                {optionsList.map(option => {
                    return (
                        <option value={option}>
                            {option}
                        </option>
                    );
                })}
            </S.Select>
        </S.Wrapper>
    );
}

export default forwardRef(InputSelect);
