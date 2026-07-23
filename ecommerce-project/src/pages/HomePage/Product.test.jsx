import { it, describe, expect,vi } from 'vitest';
import { Product } from './Product';
import { render , screen} from '@testing-library/react';

describe('Product Component', () => {
    it('displays product details correctly', () => {
        const GetCart=vi.fn();
        render(<Product product={{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 699,
            keywords: ["socks", "sports", "apparel"]
        }} GetCart={GetCart} />)
        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
        expect(screen.getByText('₹699')).toBeInTheDocument();
    });
});