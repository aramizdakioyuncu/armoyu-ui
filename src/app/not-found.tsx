import React from 'react';
import { NotFound } from '../components/shared/NotFound';
import { MainLayoutWrapper } from '../components/shared/MainLayoutWrapper';

export default function GlobalNotFound() {
  return (
    <MainLayoutWrapper className="flex items-center justify-center py-20">
      <NotFound 
        code="404"
        title="HARİTA YÜKLENEMEDİ!"
        message="Eyvah! Aradığın sayfa ya platformdan banlandı, ya da admin seni yanlışlıkla gerçeklikten kickledi. Hemen gerçek dünyaya respawn olalım."
        footerMessage="error: target_not_found"
      />
    </MainLayoutWrapper>
  );
}
