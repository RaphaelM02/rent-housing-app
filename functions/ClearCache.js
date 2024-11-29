import * as FileSystem from 'expo-file-system';

const clearCache = async () => {
    try {
        console.log('Clearing cache...');

        const cacheDir = FileSystem.cacheDirectory;
        if (cacheDir) {
            const cacheFiles = await FileSystem.readDirectoryAsync(cacheDir);
            for (const file of cacheFiles) {
                await FileSystem.deleteAsync(`${cacheDir}${file}`, { idempotent: true });
            }
        console.log('FileSystem cache cleared.');
        }
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
};

export default clearCache;
