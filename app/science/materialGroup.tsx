'use client';
import { Button, ButtonGroup } from '@nextui-org/react';

export function MaterialGroup() {
    return (
        <ButtonGroup className='content-center'>
            <Button>Lecutres</Button>
            <Button>Presentions</Button>
            <Button>Tutorials</Button>
        </ButtonGroup>
    );
}
