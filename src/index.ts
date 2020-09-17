async function loop(): Promise<void> {
    console.log('checking...')


    // pause for some period, then call again
    await new Promise((r) => setTimeout(r, 1000));
    await loop();
}

// kick off task
loop().catch(e => console.error(e))
