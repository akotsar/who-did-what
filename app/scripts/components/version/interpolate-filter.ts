module WhoDidWhat.Version.InterpolateFilter {
    angular.module('whoDidWhat.version.interpolate-filter', [])
        .filter('interpolate', [
            'version', (version: string) => {
                return (text: string) => {
                    return text.replace(/\%VERSION\%/mg, version);
                };
            }
        ]);
}