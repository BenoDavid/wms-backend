const forbiddenPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /(\%22)|(\")/i,
    /\b(SELECT|UPDATE|DELETE|INSERT|DROP|UNION|CREATE|ALTER|TRUNCATE|EXEC|EXECUTE|CAST|DECLARE|SET|GRANT|REVOKE|REPLACE)\b/i,
    /\b(OR|AND)\b\s+[^=]*?=/i,
    /(;|--|\*\/|\*\\|xp_|sp_|0x[0-9A-F]+)/i,
    /['"`;]+.*?(=|--|\/\*|\*\/)/i,
    /\b(WHERE|HAVING)\b.*?(=|LIKE|IN)/i
];

function hasInjection(value) {
    if (typeof value !== 'string') return false;
    return forbiddenPatterns.some((pattern) => pattern.test(value));
}

function deepScan(obj) {
    for (const key in obj) {
        const val = obj[key];
        if (typeof val === 'string' && hasInjection(val)) {
            return true;
        } else if (typeof val === 'object' && val !== null) {
            if (deepScan(val)) return true;
        }
    }
    return false;
}

function sqlInjectionMiddleware(req, res, next) {
    if (
        deepScan(req.body) ||
        deepScan(req.query) ||
        deepScan(req.params)
    ) {
        return res.status(403).json({
            status: 'blocked',
            message: 'SQL Injection detected. Request blocked.'
        });
    }
    next();
}

module.exports = sqlInjectionMiddleware;
