import { Locator, Page } from '@playwright/test';

export class HamburgerMenu {
    readonly page: Page;

    // Selectors
    readonly hamburgerMenuButton: Locator;
    readonly allItemsButton: Locator;
    readonly aboutButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hamburgerMenuButton = this.page.getByRole('button', { name: 'Open Menu' })
        this.allItemsButton = this.page.locator('[data-test="inventory-sidebar-link"]')
        this.aboutButton = this.page.locator('[data-test="about-sidebar-link"]')
        this.logoutButton = this.page.locator('[data-test="logout-sidebar-link"]')
    }

    async openHamburgerMenu(): Promise<void> {
        await this.hamburgerMenuButton.click();
    }

    async navigateToAbout(): Promise<void> {
        await this.aboutButton.click();
    }

    async navigateToAllItems(): Promise<void> {
        await this.allItemsButton.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutButton.click();
    }
}