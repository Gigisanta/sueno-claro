import { chromium,webkit,expect } from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const baseURL=process.argv[2]??'https://sleeplike.maat.work';
await mkdir('artifacts/qa',{recursive:true});
for(const [name,type] of [['chromium',chromium],['webkit',webkit]]) {
 const browser=await type.launch();const page=await browser.newPage({viewport:name==='webkit'?{width:390,height:844}:{width:1440,height:1000},timezoneId:'America/New_York'});const errors=[],thirdParties=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',request=>{if(/googlesyndication|doubleclick/.test(request.url()))thirdParties.push(request.url());});
 await page.goto(baseURL+'/calculadora-de-sueno#sleep=mode=wake&wake=07%3A30&wakeDate=2026-09-11');await expect(page.locator('#wakeAt-time')).toHaveValue('07:30');await expect(page).toHaveURL(baseURL+'/calculadora-de-sueno');await expect(page.locator('html')).toHaveAttribute('lang','es');await page.getByRole('button',{name:'Calcular',exact:true}).click();await expect(page.locator('.result-time')).toHaveText(['22:15','23:45','01:15','02:45']);await expect(page.locator('[data-testid^="ad-"]')).toHaveCount(0);
 await page.screenshot({path:`artifacts/qa/${name}-results.png`,fullPage:true});
 await page.goto(baseURL+'/siesta');await expect(page.getByRole('button',{name:'Siesta',exact:true})).toHaveAttribute('aria-pressed','true');await page.getByRole('link',{name:'English',exact:false}).click();await expect(page).toHaveURL(baseURL+'/nap-calculator');
 for(const path of ['/sitemap.xml','/robots.txt','/manifest.webmanifest','/sw.js','/og-es.png'])expect((await page.request.get(baseURL+path)).status()).toBe(200);
 expect(errors).toEqual([]);expect(thirdParties).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);console.log(`${name}: production smoke passed; no active ads`);await browser.close();
}
