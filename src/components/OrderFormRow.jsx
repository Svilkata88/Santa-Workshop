import { useEffect, useState } from 'react';
import { validate } from '../../utils/utils';

export default function OrderFormRow({toys, setError}) {
    const [selectedToyId, setSelectedToyId] = useState('');
    const [selectedQtty, setSelectedQtty] = useState('');
    const [selectedToy, setSelectedToy] = useState({});    

    useEffect(() => {
        setSelectedToyId(selectedToyId);
        const selectedToy = toys?.find(t => t.id === selectedToyId);
        setSelectedToy(selectedToy);
    }, [selectedToyId]);
    
    return (
        <div className='flex gap-4'>
            <select name="toyId"
                value={selectedToyId}
                onChange={(e) => setSelectedToyId(e.target.value)}
                onBlur={(e) => setError(validate('toyId', e.target.value))}
                className="select-field"  
            >
                <option value="">Select toy</option>
                {
                    toys?.map(toy => (
                        <option key={toy.id} value={toy.id}>{toy.name}</option>
                    ))
                }
            </select>
            <select name="qtty"
                value={selectedQtty}
                onChange={(e) => setSelectedQtty(e.target.value)}
                onBlur={(e) => setError(validate('qtty', e.target.value))}
                className="select-field"  
            >
                <option value="">qtty</option>
                {[...Array(Number(selectedToy?.inStock || 0))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            <input 
                type="text" 
                name="childName" 
                placeholder='child name'
                onBlur={(e) => setError(validate('childName', e.target.value))}
            />
        </div>
    )
};
